mod event_handler;
mod components;

use ratatui::{DefaultTerminal, Frame, layout::{Constraint, Direction, Layout}, widgets::{Block, Borders}};

use crate::{data::state::State, ui::{components::{UIComponent, keymap::KeymapComponent, sidebar::SidebarComponent}, event_handler::UIEventHandler}};

pub struct UI<'a> {
    state: &'a mut State,
    event_handler: UIEventHandler,
    component: Option<Box<dyn UIComponent>>
}

impl<'a> UI<'a> {
    pub fn new(state: &'a mut State) -> UI<'a> {
        UI {
            state,
            event_handler: UIEventHandler::new(),
            component: None 
        }
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
            .direction(Direction::Horizontal)
            .constraints(vec![
                Constraint::Percentage(80),
                Constraint::Percentage(20)
            ])
            .split(frame.area());

        SidebarComponent::new(self.state, &mut self.event_handler)
            .block(Block::new().title("Sidebar").borders(Borders::ALL))
            .render(layout[1], frame.buffer_mut());

        let body = Layout::default()
            .direction(Direction::Vertical)
            .constraints(vec![
                Constraint::Percentage(90),
                Constraint::Percentage(10)
            ])
            .split(layout[0]);

        KeymapComponent::default()
            .block(Block::new().title("Keymap").borders(Borders::ALL))
            .render(body[1], frame.buffer_mut());

        if let Some(component) = &self.component {
            component.render(body[0], frame.buffer_mut());
        }

    }
}
