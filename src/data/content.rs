use std::path::PathBuf;

#[derive(Debug)]
pub enum ContentState {
    Incomplete,
    Complete,
    Skipped,
}

#[derive(Debug)]
pub struct Content {
    path: PathBuf,
    state: ContentState,
}

impl Content {
    pub fn new(path: PathBuf, state: Option<ContentState>) -> Content {
        Content {
            path,
            state: state.unwrap_or(ContentState::Incomplete),
        }
    }

    pub fn get_path(&self) -> &PathBuf {
        &self.path
    }

    pub fn get_state(&self) -> &ContentState {
        &self.state
    }

    pub fn set_state(&mut self, state: ContentState) {
        self.state = state;
    }
}
