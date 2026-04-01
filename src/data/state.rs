use std::{fs, io, path::PathBuf};

use crate::data::content::Chapter;

#[derive(Debug)]
pub struct State {
    root_dir: PathBuf,
    running: bool,
    chapters: Vec<Chapter>,
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

    pub fn get_root_dir(&self) -> &PathBuf {
        &self.root_dir
    }

    pub fn is_finished(&self) -> bool {
        self.chapters.len() <= self.current as usize
    }
   
    pub fn get_current(&self) -> Option<&Chapter> {
        self.chapters.get(self.current as usize)
    }

    pub fn get_chapters(&self) -> &Vec<Chapter> {
        &self.chapters
    }

    pub fn incr_current(&mut self) -> usize {
        self.current += 1;
        self.current
    }

    pub fn decr_current(&mut self) -> usize {
        self.current -= 1;
        self.current
    }
}
