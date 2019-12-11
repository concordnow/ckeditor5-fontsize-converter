import FontSizeConverter from './../src/fontsizeconverter';
import ParagraphFontSizeConverter from './../src/paragraphfontsizeconverter';
import SpanFontSizeConverter from './../src/spanfontsizeconverter';
import DowncastConverter from './../src/downcastconverter';

describe( 'FontSizeConverter', () => {
	it( 'requires ParagraphFontSizeConverter', () => {
		expect( FontSizeConverter.requires ).to.deep.equal( [ ParagraphFontSizeConverter, SpanFontSizeConverter, DowncastConverter ] );
	} );

	it( 'defines plugin name', () => {
		expect( FontSizeConverter.pluginName ).to.equal( 'FontSizeConverter' );
	} );
} );
