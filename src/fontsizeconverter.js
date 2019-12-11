import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ParagraphFontSizeConverter from './paragraphfontsizeconverter';
import SpanFontSizeConverter from './spanfontsizeconverter';
import DowncastConverter from './downcastconverter';

export default class FontSizeConverter extends Plugin {
	static get requires() {
		return [ ParagraphFontSizeConverter, SpanFontSizeConverter, DowncastConverter ];
	}

	static get pluginName() {
		return 'FontSizeConverter';
	}
}
