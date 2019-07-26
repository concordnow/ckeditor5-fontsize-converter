import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ParagraphFontSizeConverter from './paragraphfontsizeconverter';

export default class FontSizeConverter extends Plugin {
	static get requires() {
		return [ ParagraphFontSizeConverter ];
	}

	static get pluginName() {
		return 'FontSizeConverter';
	}
}
