use ratatui::{buffer::Buffer, layout::Rect};

pub mod markdown_widget;
pub mod runner_widget;

pub trait UIWidget {
    fn render(&self, area: Rect, buf: &mut Buffer);
}
