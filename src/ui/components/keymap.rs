use ratatui::{buffer::Buffer, layout::Rect, widgets::{Block, BlockExt, Paragraph, Widget}};

use crate::ui::components::UIComponent;

#[derive(Default)]
pub struct KeymapComponent<'a> {
    block: Option<Block<'a>>
}

impl<'a> KeymapComponent<'a> {
    pub fn block(mut self, block: Block<'a>) -> Self {
        self.block = Some(block);
        self
    }
}

impl UIComponent for KeymapComponent<'_> {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        self.block.as_ref().render(area, buf);
        Paragraph::new("keymaps").render(self.block.inner_if_some(area), buf);
    }
}
