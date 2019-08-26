export const POINT_TO_PIXEL_MULTIPLICATOR = ( 2 / 3 * 2 );

export function getRoundedFontSize( fontSize ) {
	switch ( true ) {
		case fontSize.indexOf( 'pt' ) > -1:
			fontSize = parseInt( fontSize.replace( 'pt', '' ) ) * POINT_TO_PIXEL_MULTIPLICATOR;
			break;
		case fontSize.indexOf( 'px' ) > -1:
			fontSize = parseInt( fontSize.replace( 'px', '' ) );
			break;
	}

	return Math.round( fontSize );
}
