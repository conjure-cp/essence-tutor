use ratatui::Frame;

pub trait UIComponent {
    fn render(&self, frame: Frame);
}
