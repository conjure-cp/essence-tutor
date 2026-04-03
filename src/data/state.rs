use std::{fs, io, path::PathBuf};

use crate::data::content::{Chapter, ContentState};

#[derive(Debug)]
pub struct State {
    root_dir: PathBuf,
    running: bool,
    pub chapters: Vec<Chapter>,
    current: usize,
}

impl State {
    pub fn new(root_dir: PathBuf, current: Option<usize>) -> io::Result<State> {
        Ok(State {
            chapters: State::load_chapters(&root_dir).expect("failed to load chapters"),
            root_dir,
            running: true,
            current: current.unwrap_or(0),
        })
    }

    fn load_chapters(root_dir: &PathBuf) -> io::Result<Vec<Chapter>> {
        let mut chapters: Vec<Chapter> = Vec::new();
        // traverse root directory for chapter directories
        for f in fs::read_dir(&root_dir)? {
            let path: PathBuf = f?.path();
            // not a directory? ignore
            if path.is_dir() {
                chapters.push(Chapter::new(path, None)?)
            }
        }

        chapters.sort_by_key(|c| *c.get_number());
        Ok(chapters)
    }

    pub fn exit(&mut self) {
        self.running = false;
    }

    pub fn is_running(&self) -> bool {
        self.running
    }
    
    pub fn get_chapter_count(&self) -> usize {
        self.chapters.len()
    }

    pub fn get_complete_chapter_count(&self) -> usize {
        self.chapters.iter()
            .filter(|i| matches!(i.get_state(), ContentState::Complete) || matches!(i.get_state(), ContentState::Skipped))
            .count()
    }
}
