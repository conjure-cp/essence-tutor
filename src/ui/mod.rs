mod event_handler;
mod widgets;

use ratatui::{DefaultTerminal, Frame, layout::{Constraint, Direction, Layout}, widgets::{Block, Borders, Widget}};

use crate::{data::state::State, ui::{event_handler::UIEventHandler, widgets::{keymap_widget::KeymapWidget, sidebar_widget::SidebarWidget}}};

pub struct UI<'a> {
    state: &'a mut State,
    event_handler: UIEventHandler,
    widget: Option<Box<dyn Widget>>
}

impl<'a> UI<'a> {
    pub fn new(state: &'a mut State) -> UI<'a> {
        UI {
            state,
            event_handler: UIEventHandler::default(),
            widget: None 
        }
    }

    pub fn get_state(&mut self) -> &mut State {
        &mut self.state
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
        let layout = Layout::default()
            .direction(Direction::Vertical)
            .constraints(vec![
                Constraint::Percentage(90),
                Constraint::Percentage(10)
            ])
            .split(frame.area());

        frame.render_widget(
            KeymapWidget::default().block(Block::new().title("Keymap").borders(Borders::ALL)),
            layout[1]
        );

        let body = Layout::default()
            .direction(ratatui::layout::Direction::Horizontal)
            .constraints(vec![
                Constraint::Percentage(80),
                Constraint::Percentage(20)
            ])
            .split(layout[0]);

        /*if let Some(widget) = self.widget {
            widget.render(body[0], frame.buffer_mut());
        }*/

        frame.render_widget(
            SidebarWidget::default().block(Block::new().title("Sidebar").borders(Borders::ALL)),
            body[1]
        );
    }
}
