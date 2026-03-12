mod data;
mod ui;

use std::{io, path::PathBuf};

use crate::{data::state::State, ui::app::App};

fn main() -> io::Result<()> {
    let mut state = State::new(PathBuf::from("content"), None);
    let mut app = App::new(&mut state);
    ratatui::run(|terminal| app.run(terminal))
}
