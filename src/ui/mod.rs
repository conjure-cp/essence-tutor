mod event_handler;
mod components;

use ratatui::{DefaultTerminal, Frame, layout::{Constraint, Direction, Layout}, widgets::{Block, Borders}};

use crate::{data::{content::TaskFileType, state::State}, ui::{components::{UIComponent, keymap::KeymapComponent, markdown::MarkdownComponent, runner::RunnerComponent, sidebar::SidebarComponent}, event_handler::UIEventHandler}};

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

    pub fn run(&'a mut self, terminal: &mut DefaultTerminal) -> Result<(), Box<dyn std::error::Error>> {
        loop {
            let current = self.state.get_current().clone();
            self.component = match current.get_filetype() {
                TaskFileType::Markdown => Some(Box::from(MarkdownComponent::new(current))),
                TaskFileType::Essence => Some(Box::from(RunnerComponent::new(current)))
            };

            if !self.state.is_running() {
                return Ok(());
            }

            terminal.draw(|frame| self.render(frame))?;
            self.event_handler.process_events(&mut self.state)?;
        }
    }

    pub fn render(&mut self, frame: &mut Frame) {
        let layout = Layout::default()
            .direction(Direction::Horizontal)
            .constraints(vec![
                Constraint::Fill(1),
                Constraint::Percentage(if self.state.is_sidebar_shown() { 20 } else { 0 })
            ])
            .split(frame.area());

        if self.state.is_sidebar_shown() {
            SidebarComponent::new(self.state)
                .block(Block::new().title("Sidebar").borders(Borders::ALL))
                .render(layout[1], frame.buffer_mut());
        }

        let body = Layout::default()
            .direction(Direction::Vertical)
            .constraints(vec![
                Constraint::Fill(1),
                Constraint::Percentage(10)
            ])
            .split(layout[0]);

        KeymapComponent::new(&self.event_handler)
            .block(Block::new().title("Keymap").borders(Borders::ALL))
            .render(body[1], frame.buffer_mut());

        if let Some(component) = &self.component {
            component.render(body[0], frame.buffer_mut());
        }
    }
}
