import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import { getData as getModelData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import FontSizeEditing from '@ckeditor/ckeditor5-font/src/fontsize/fontsizeediting';

import SpanFontSizeConverter from './../src/spanfontsizeconverter';
import { POINT_TO_PIXEL_MULTIPLICATOR } from './../src/utils';

describe( 'SpanFontSizeConverter', () => {
	let editor, doc;

	afterEach( () => {
		if ( editor ) {
			return editor.destroy();
		}
	} );

	it( 'defines plugin name', () => {
		expect( SpanFontSizeConverter.pluginName ).to.equal( 'SpanFontSizeConverter' );
	} );

	describe( 'conversion', () => {
		beforeEach( () => {
			return VirtualTestEditor
				.create( {
					plugins: [ FontSizeEditing, Paragraph, SpanFontSizeConverter ],
					fontSize: {
						options: [ 6, 7, 8, 9, 10, 11, 12, 13, 'default',
							14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
							26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ]
					},
				} )
				.then( newEditor => {
					editor = newEditor;
					doc = editor.model;
				} );
		} );

		it( 'should convert font-size in px for every children', () => {
			editor.setData( '<p>f<span style="font-size:30pt;">o</span>o</p>' );
			const fontSize = Math.round( 30 * POINT_TO_PIXEL_MULTIPLICATOR );

			expect( getModelData( doc ) ).to.equal( `<paragraph>[]f<$text fontSize="${ fontSize }">o</$text>o</paragraph>` );
			expect( editor.getData() )
				.to.equal( `<p>f<span style="font-size:${ fontSize }px;">o</span>o</p>` );
		} );
	} );
} );
