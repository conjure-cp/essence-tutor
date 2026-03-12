use std::{fmt::Debug, io};

use crossterm::event::{self, Event, KeyCode, KeyEvent, KeyEventKind};
use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}, DefaultTerminal, Frame};

use crate::data::state::State;


#[derive(Debug)]
pub struct App<'a> {
    exit: bool,
    state: &'a mut State
}

impl<'a> App<'a> {
    pub fn new(state: &'a mut State) -> App<'a> {
        App { state, exit: false }
    }

    pub fn run(&mut self, terminal: &mut DefaultTerminal) -> io::Result<()> {
        while !self.exit {
            terminal.draw(|frame| self.draw(frame))?;
            let _ = self.handle_events();
        }
        Ok(())
    }

    fn draw(&self, frame: &mut Frame) {
        frame.render_widget(self, frame.area());
    }

    fn handle_events(&mut self) -> io::Result<()> {
        match event::read()? {
            Event::Key(key_event) if key_event.kind == KeyEventKind::Press => {
                self.handle_key_event(key_event)
            }
            _ => {  }
        };
        Ok(())
    }

    fn handle_key_event(&mut self, key_event: KeyEvent) {
        if let KeyCode::Char('q') = key_event.code {
            self.exit = true;
        }
    } 
}

impl<'a> Widget for &App<'a> {
    fn render(self, area: Rect, buf: &mut Buffer) {
        let mut paragraph: String = String::new();
        for c in self.state.get_content() {
            paragraph.push_str(&format!("{:?}\n", c.get_path()));
        }
        Paragraph::new(paragraph).centered().render(area, buf);
    }
}
