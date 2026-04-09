mod data;
mod ui;

use std::path::PathBuf;

use crate::{data::state::State, ui::UI};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut state: State = State::new(PathBuf::from("content"), None, None)?;
    let mut ui: UI = UI::new(&mut state);

    color_eyre::install()?;
    ratatui::run(|terminal| ui.run(terminal))
}
