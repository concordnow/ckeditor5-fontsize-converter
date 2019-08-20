import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ParagraphFontSizeConverter from './paragraphfontsizeconverter';
import SpanFontSizeConverter from './spanfontsizeconverter';

export default class FontSizeConverter extends Plugin {
	static get requires() {
		return [ ParagraphFontSizeConverter, SpanFontSizeConverter ];
	}

	static get pluginName() {
		return 'FontSizeConverter';
	}
}
