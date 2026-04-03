use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}};

use crate::ui::components::UIComponent;

pub struct RunnerWidget {}

impl UIComponent for RunnerWidget {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        Paragraph::new("runner").render(area, buf);
    }
}
