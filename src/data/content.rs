use std::{ffi::OsStr, fmt::{Display, Formatter, Result}, fs, io, path::PathBuf};

#[derive(Debug, Clone)]
pub enum ContentState {
    Complete,
    Incomplete,
    Skipped,
}

impl Display for ContentState {
    fn fmt(&self, f: &mut Formatter) -> Result {
        match self {
            ContentState::Complete => write!(f, "🟩"),
            ContentState::Incomplete => write!(f, "🟨"),
            ContentState::Skipped => write!(f, "⬜")
        }
    }
}

#[derive(Debug)]
pub struct Chapter {
    number: u8,
    title: String,
    path: PathBuf,
    state: ContentState,
    tasks: Vec<Task>,
}

fn filename_to_title(filename: &str) -> String {
    filename.split("-")
        .skip(1)
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None => String::new(),
                Some(c) => c.to_uppercase().collect::<String>() + chars.as_str(),
            }
        })
        .collect::<Vec<String>>()
        .join(" ")
}

fn filename_to_number(filename: &str) -> u8 {
    filename.split("-")
        .next()
        .unwrap()
        .parse()
        .expect("failed to parse number")
}

impl Chapter {
    pub fn new(path: PathBuf, state: Option<ContentState>) -> io::Result<Chapter> {
        let filename: &str = path.file_stem().and_then(OsStr::to_str).expect("failed to get file stem");
        Ok(Chapter {
            number: filename_to_number(filename),
            title: filename_to_title(filename),
            tasks: Chapter::load_tasks(&path).expect("failed to load tasks for chapter"),
            path,
            state: state.unwrap_or(ContentState::Incomplete),
        })
    }

    fn load_tasks(path: &PathBuf) -> io::Result<Vec<Task>> {
        let mut tasks: Vec<Task> = Vec::new();
        // traverse chapter directory to get tasks
        for f in fs::read_dir(path)? {
            let path: PathBuf = f?.path();
           
            // parse filetype
            let ft: Option<TaskFileType> = match path.extension().and_then(OsStr::to_str) {
                Some("md") => Some(TaskFileType::Markdown),
                Some("essence") => Some(TaskFileType::Essence),
                _ => None
            };

            // filetype not md or essence? ignore file
            if ft.is_some() {
                tasks.push(Task::new(path, ft.unwrap_or(TaskFileType::Markdown), None))
            }
        }

        tasks.sort_by_key(|t| t.number);
        Ok(tasks)
    }

    pub fn get_number(&self) -> &u8 {
        &self.number
    }

    pub fn get_title(&self) -> &str {
        &self.title
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

    pub fn get_tasks(&mut self) -> &mut Vec<Task> {
        &mut self.tasks
    }
}

#[derive(Debug, Clone)]
pub enum TaskFileType {
    Markdown,
    Essence,
}

#[derive(Debug, Clone)]
pub struct Task {
    number: u8,
    title: String,
    path: PathBuf,
    ft: TaskFileType,
    state: ContentState,
}

impl Task {
    pub fn new(path: PathBuf, ft: TaskFileType, state: Option<ContentState>) -> Task {
        let filename: &str = path.file_stem().and_then(OsStr::to_str).expect("failed to get file stem");

        Task {
            number: filename_to_number(filename),
            title: filename_to_title(filename),
            path,
            ft,
            state: state.unwrap_or(ContentState::Incomplete),
        }
    }

    pub fn get_number(&self) -> &u8 {
        &self.number
    }

    pub fn get_title(&self) -> &str {
        &self.title
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
