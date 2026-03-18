mod data;

use std::{io, path::PathBuf};

use crate::data::state::AppState;

fn main() -> io::Result<()> {
    let state: AppState = AppState::new(PathBuf::from("content"), None)?;
    for chapter in state.get_chapters() {
        println!("{:?}", chapter);
    }
    Ok(())
    /*let mut ui = AppUI::new(&mut state);
    ratatui::run(|terminal| ui.run(terminal))*/
}
