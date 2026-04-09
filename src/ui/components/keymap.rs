use ratatui::{buffer::Buffer, layout::Rect, style::Stylize, text::{Line, Span, Text}, widgets::{Block, BlockExt, Paragraph, Widget}};

use crate::ui::{components::UIComponent, event_handler::UIEventHandler};

pub struct KeymapComponent<'a> {
    event_handler: &'a UIEventHandler,
    block: Option<Block<'a>>,
}

impl<'a> KeymapComponent<'a> {
    pub fn new(event_handler: &'a UIEventHandler) -> KeymapComponent<'a> {
        KeymapComponent { 
            event_handler,
            block: None
        }
    }

    pub fn block(mut self, block: Block<'a>) -> Self {
        self.block = Some(block);
        self
    }
}

impl UIComponent for KeymapComponent<'_> {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        self.block.as_ref().render(area, buf);
        
        let mut spans: Vec<Span> = Vec::new();

        for keybind in self.event_handler.get_keybinds().iter() {
            let codes = keybind.get_codes().iter()
                .map(|k| k.to_string())
                .collect::<Vec<String>>()
                .join("/");

            spans.push(format!(" {} ", codes).black().on_white());
            spans.push(" ".into());
            spans.push(keybind.get_description().into());
        }

        let line = Line::from(spans);
        let text = Text::from(line);

        Paragraph::new(text).render(self.block.inner_if_some(area), buf);
    }
}
