use std::{fs, path::PathBuf};

use crate::data::content::Content;

#[derive(Debug)]
pub struct State {
    root_dir: PathBuf,
    content: Vec<Content>,
    current: usize,
}

impl State {
    pub fn new(root_dir: PathBuf, current: Option<usize>) -> State {
        let mut content: Vec<Content> = Vec::new();

        match fs::read_dir(&root_dir) {
            Ok(paths) => for path in paths {
                content.push(Content::new(path.unwrap().path(), None));
            }
            Err(e) => panic!("{:?}", e),
        }

        State {
            root_dir,
            content,
            current: current.unwrap_or(0),
        }
    }

    pub fn get_root_dir(&self) -> &PathBuf {
        &self.root_dir
    }

    pub fn is_finished(&self) -> bool {
        self.content.len() <= self.current as usize
    }
   
    pub fn get_current(&self) -> Option<&Content> {
        self.content.get(self.current as usize)
    }

    pub fn get_content(&self) -> &Vec<Content> {
        &self.content
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
