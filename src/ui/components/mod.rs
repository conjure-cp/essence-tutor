use ratatui::{buffer::Buffer, layout::Rect};

pub mod keymap_component;
pub mod markdown_component;
pub mod runner_component;
pub mod sidebar_component;

pub trait UIComponent {
    fn render(&self, area: Rect, buf: &mut Buffer);
}
