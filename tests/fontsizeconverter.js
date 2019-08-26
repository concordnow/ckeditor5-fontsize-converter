import FontSizeConverter from './../src/fontsizeconverter';
import ParagraphFontSizeConverter from './../src/paragraphfontsizeconverter';
import SpanFontSizeConverter from './../src/spanfontsizeconverter';

describe( 'FontSizeConverter', () => {
	it( 'requires ParagraphFontSizeConverter', () => {
		expect( FontSizeConverter.requires ).to.deep.equal( [ ParagraphFontSizeConverter, SpanFontSizeConverter ] );
	} );

	it( 'defines plugin name', () => {
		expect( FontSizeConverter.pluginName ).to.equal( 'FontSizeConverter' );
	} );
} );
