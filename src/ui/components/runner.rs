use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}};

use crate::{data::content::Task, ui::components::UIComponent};

pub struct RunnerComponent {
    task: Task
}

impl RunnerComponent {
    pub fn new(task: Task) -> RunnerComponent {
        RunnerComponent { task }
    }
}

impl UIComponent for RunnerComponent {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        Paragraph::new("runner").render(area, buf);
    }
}
