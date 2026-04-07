use crossterm::event::{self, KeyCode};

use crate::data::state::State;

#[derive(PartialEq)]
pub enum KeybindCategory {
    General,
    Control,
    Content
}

#[derive(PartialEq)]
pub struct Keybind {
    codes: Vec<KeyCode>,
    description: String,
    category: KeybindCategory,
    action: fn(state: &mut State)
}

pub struct UIEventHandler {
    keybinds: Vec<Keybind>
}

impl UIEventHandler {
    pub fn new() -> UIEventHandler {
        UIEventHandler {
            keybinds: UIEventHandler::get_default_keybinds()
        }
    }
    
    fn get_default_keybinds() -> Vec<Keybind> {
        vec![
            Keybind {
                codes: vec![KeyCode::Char('q'), KeyCode::Esc],
                description: String::from("quit"),
                category: KeybindCategory::General,
                action: |state| state.exit()
            }
        ]
    }

    pub fn get_keybinds(&self) -> &Vec<Keybind> {
        &self.keybinds
    }

    pub fn register_keybind(&mut self, keybind: Keybind) {
        self.keybinds.insert(0, keybind);
    }

    pub fn deregister_keybind(&mut self, keybind: &Keybind) {
        self.keybinds.retain(|k| k != keybind)
    }

    pub fn deregister_keybinds(&mut self, category: Option<KeybindCategory>) {
        self.keybinds.retain(|k| {
            if let Some(c) = &category {
                UIEventHandler::get_default_keybinds().contains(k) || k.category != *c
            } else {
                UIEventHandler::get_default_keybinds().contains(k)
            }
        })
    }

    fn process_key_events(&mut self, state: &mut State) -> Result<(), Box<dyn std::error::Error>> {
        if let Some(key) = event::read()?.as_key_press_event() {
            self.keybinds.iter()
                .filter(|k| k.codes.contains(&key.code))
                .for_each(|k| (k.action)(state));
        }
        Ok(())
    }

    pub fn process_events(&mut self, state: &mut State) -> Result<(), Box<dyn std::error::Error>> {
        self.process_key_events(state)
    }
}
