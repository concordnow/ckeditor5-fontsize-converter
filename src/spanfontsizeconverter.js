import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { getRoundedFontSize } from './utils';

export default class SpanFontSizeConverter extends Plugin {
	static get pluginName() {
		return 'SpanFontSizeConverter';
	}

	init() {
		const editor = this.editor;

		editor.conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				styles: {
					'font-size': /[\s\S]+/
				}
			},
			model: {
				key: 'fontSize',
				value: viewElement => {
					const fontSize = viewElement.getStyle( 'font-size' );
					const value = getRoundedFontSize( fontSize );

					return value;
				}
			},
			converterPriority: 'high'
		} );
	}
}
