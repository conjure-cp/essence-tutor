use ratatui::{buffer::Buffer, layout::Rect};

pub mod keymap;
pub mod markdown;
pub mod runner;
pub mod sidebar;

pub trait UIComponent {
    fn render(&self, area: Rect, buf: &mut Buffer);
}
