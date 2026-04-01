pub mod components;
mod event_handler;

use ratatui::{DefaultTerminal, Frame, layout::{Constraint, Layout}, widgets::{Block, Borders, Paragraph, Widget}};

use crate::{data::state::State, ui::{event_handler::UIEventHandler, components::UIComponent}};

pub struct UI<'a> {
    exit: bool,
    state: &'a mut State,
    event_handler: UIEventHandler,
    views: Vec<Box<dyn UIComponent>>,
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

    pub fn get_views(&self) -> &Vec<Box<dyn UIComponent>> {
        &self.views
    }

    pub fn register_view(&mut self, view: Box<dyn UIComponent>) {
        self.views.push(view);
    }

    pub fn deregister_view(&mut self, i: usize) {
        self.views.remove(i);
    }

    pub fn set_current_view(&mut self, i: Option<usize>) {
        self.current_view = i;
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
        Paragraph::new("hello world").render(frame.area(), frame.buffer_mut());

        let layout = Layout::default()
            .direction(ratatui::layout::Direction::Vertical)
            .constraints(vec![
                Constraint::Percentage(10),
                Constraint::Percentage(80),
                Constraint::Percentage(10)
            ])
            .split(frame.area());

        frame.render_widget(
            Paragraph::new("header").block(Block::new().borders(Borders::ALL)),
            layout[0],
        );
        frame.render_widget(
            Paragraph::new("content").block(Block::new().borders(Borders::ALL)),
            layout[1]
        );
        frame.render_widget(
            Paragraph::new("footer").block(Block::new().borders(Borders::ALL)),
            layout[2]
        );
    }
}
