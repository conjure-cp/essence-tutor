use std::{fs, io, path::PathBuf};

use crate::data::content::{Chapter, ContentState, Task};

#[derive(Debug)]
pub struct State {
    root_dir: PathBuf,
    running: bool,
    sidebar_shown: bool,
    pub chapters: Vec<Chapter>,
    current_chapter: usize,
    current_task: usize
}

impl State {
    pub fn new(root_dir: PathBuf, current_chapter: Option<usize>, current_task: Option<usize>) -> io::Result<State> {
        Ok(State {
            chapters: State::load_chapters(&root_dir).expect("failed to load chapters"),
            root_dir,
            running: true,
            sidebar_shown: true,
            current_chapter: current_chapter.unwrap_or(0),
            current_task: current_task.unwrap_or(0),
        })
    }

    fn load_chapters(root_dir: &PathBuf) -> io::Result<Vec<Chapter>> {
        let mut chapters: Vec<Chapter> = Vec::new();
        // traverse root directory for chapter directories
        for f in fs::read_dir(root_dir)? {
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
   
    pub fn get_current(&self) -> &Task {
        &self.chapters[self.current_chapter].get_tasks()[self.current_task]
    }

    pub fn next(&mut self) {
        // TODO: better checking (e.g. for start/end of all)
        if self.current_task + 1 >= self.chapters[self.current_chapter].get_tasks().len() {
            self.current_task = 0;
            self.current_chapter += 1;
        } else {
            self.current_task += 1;
        }
    }

    pub fn previous(&mut self) {
        // TODO: better checking
        if self.current_task <= 0 {
            self.current_chapter -= 1;
            self.current_task = self.chapters[self.current_chapter].get_tasks().len() - 1;
        } else {
            self.current_task -= 1;
        }
    }

    pub fn get_chapter_count(&self) -> usize {
        self.chapters.len()
    }

    pub fn get_complete_chapter_count(&self) -> usize {
        self.chapters.iter()
            .filter(|i| matches!(i.get_state(), ContentState::Complete) || matches!(i.get_state(), ContentState::Skipped))
            .count()
    }

    pub fn is_sidebar_shown(&self) -> bool {
        self.sidebar_shown
    }

    pub fn toggle_sidebar(&mut self) {
        self.sidebar_shown = !self.sidebar_shown;
    }
}
