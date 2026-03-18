use std::{ffi::OsStr, fs, io, path::PathBuf};

#[derive(Debug)]
pub enum ContentState {
    Incomplete,
    Complete,
    Skipped,
}

#[derive(Debug)]
pub struct Chapter {
    path: PathBuf,
    state: ContentState,
    tasks: Vec<Task>,
}

impl Chapter {
    pub fn new(path: PathBuf, state: Option<ContentState>) -> io::Result<Chapter> {
        let mut tasks: Vec<Task> = Vec::new();

        for f in fs::read_dir(&path)? {
            let path: PathBuf = f?.path();
            let ft: Option<TaskFileType>;
            
            match path.extension().and_then(OsStr::to_str) {
                Some("md") => ft = Some(TaskFileType::Markdown),
                Some("essence") => ft = Some(TaskFileType::Essence),
                _ => ft = None
            }

            if ft.is_some() {
                tasks.push(Task::new(path, ft.unwrap_or(TaskFileType::Markdown), None))
            }
        }

        Ok(Chapter {
            path,
            state: state.unwrap_or(ContentState::Incomplete),
            tasks
        })
    }
}

#[derive(Debug)]
pub enum TaskFileType {
    Markdown,
    Essence,
}

#[derive(Debug)]
pub struct Task {
    path: PathBuf,
    ft: TaskFileType,
    state: ContentState,
}

impl Task {
    pub fn new(path: PathBuf, ft: TaskFileType, state: Option<ContentState>) -> Task {
        Task {
            path,
            ft,
            state: state.unwrap_or(ContentState::Incomplete),
        }
    }

    pub fn get_path(&self) -> &PathBuf {
        &self.path
    }

    pub fn get_filetype(&self) -> &TaskFileType {
        &self.ft
    }

    pub fn get_state(&self) -> &ContentState {
        &self.state
    }

    pub fn set_state(&mut self, state: ContentState) {
        self.state = state;
    }
}
