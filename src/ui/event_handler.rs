use std::collections::HashMap;

use crossterm::event::{self, KeyCode};

use crate::data::state::State;

#[derive(Default)]
pub struct UIEventHandler {
    fixed_keymap: HashMap<KeyCode, fn()>,
    dynamic_keymap: HashMap<KeyCode, fn()>,
}

impl<'a> UIEventHandler {
    pub fn new() -> UIEventHandler {
        UIEventHandler {
            fixed_keymap: HashMap::new(),
            dynamic_keymap: HashMap::new(),
        }
    }

    pub fn process_events(&mut self, state: &mut State) -> Result<(), Box<dyn std::error::Error>> {
        self.process_key_events(state)
    }

    fn process_key_events(&mut self, state: &mut State) -> Result<(), Box<dyn std::error::Error>> {
        if let Some(key) = event::read()?.as_key_press_event() {
            match key.code {
                // hard-coded values
                KeyCode::Char('q') | KeyCode::Esc => state.exit(),
                _ => {}
            }
        }
        Ok(())
    }
}
