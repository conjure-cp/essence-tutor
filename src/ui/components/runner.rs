use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}};

use crate::ui::components::UIComponent;

pub struct RunnerComponent {}

impl UIComponent for RunnerComponent {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        Paragraph::new("runner").render(area, buf);
    }
}
