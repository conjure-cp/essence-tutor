mod event_handler;
mod widgets;

use ratatui::{DefaultTerminal, Frame, layout::{Constraint, Direction, Layout}, widgets::{Block, Borders}};

use crate::{data::state::State, ui::{event_handler::UIEventHandler, widgets::UIWidget}};

pub struct UI<'a> {
    exit: bool,
    state: &'a mut State,
    event_handler: UIEventHandler,
    views: Vec<Box<dyn UIWidget>>,
    current_view: Option<usize>
}

impl<'a> UI<'a> {
    pub fn new(state: &'a mut State) -> UI<'a> {
        UI {
            exit: false,
            state,
            event_handler: UIEventHandler::default(),
            views: Vec::new(),
            current_view: None
        }
    }

    pub fn get_state(&mut self) -> &mut State {
        &mut self.state
    }

    pub fn get_views(&self) -> &Vec<Box<dyn UIWidget>> {
        &self.views
    }

    pub fn register_view(&mut self, view: Box<dyn UIWidget>) {
        self.views.push(view);
    }

    pub fn deregister_view(&mut self, i: usize) {
        self.views.remove(i);
    }

    pub fn set_current_view(&mut self, i: Option<usize>) {
        self.current_view = i;
    }

    pub fn get_current_view(&self) -> Option<&Box<dyn UIWidget>> {
        self.views.get(self.current_view?)
    }

    pub fn exit(&mut self) {
        self.exit = true;
    }

    pub fn run(&mut self, terminal: &mut DefaultTerminal) -> Result<(), Box<dyn std::error::Error>> {
        loop {
            terminal.draw(|frame| self.render(frame))?;

            self.event_handler.process_events(self.state)?;

            if !self.state.is_running() {
                return Ok(());
            }
        }
    }

    pub fn render(&mut self, frame: &mut Frame) {
        let top_level = Layout::default()
            .direction(Direction::Vertical)
            .constraints(vec![
                Constraint::Percentage(90),
                Constraint::Percentage(10)
            ])
            .split(frame.area());


        let content = Layout::default()
            .direction(ratatui::layout::Direction::Horizontal)
            .constraints(vec![
                Constraint::Percentage(80),
                Constraint::Percentage(20)
            ])
            .split(top_level[0]);

        if let Some(view) = self.get_current_view() {
            view.render(content[0], frame.buffer_mut());
        }

        frame.render_widget(
            Block::new().title("Sidebar").borders(Borders::ALL),
            content[1]
        );
        
        frame.render_widget(
            Block::new().title("Keymap").borders(Borders::ALL),
            top_level[1]
        );
    }
}
