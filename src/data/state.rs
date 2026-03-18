use std::{fs, io, path::PathBuf};

use crate::data::content::Chapter;

#[derive(Debug)]
pub struct AppState {
    root_dir: PathBuf,
    chapters: Vec<Chapter>,
    current: usize,
}

impl AppState {
    pub fn new(root_dir: PathBuf, current: Option<usize>) -> io::Result<AppState> {
        let mut chapters: Vec<Chapter> = Vec::new();

        for f in fs::read_dir(&root_dir)? {
            let path: PathBuf = f?.path();
            if path.is_dir() {
                chapters.push(Chapter::new(path, None)?)
            }
        }

        Ok(AppState {
            root_dir,
            chapters,
            current: current.unwrap_or(0),
        })
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
