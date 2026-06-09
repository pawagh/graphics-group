<?php
/**
 * VCAIL Lab Theme — functions.php
 */

defined( 'ABSPATH' ) || exit;

// ── Theme setup ──────────────────────────────────────────────────────────────

add_action( 'after_setup_theme', function () {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'gallery', 'caption' ] );

    register_nav_menus( [
        'primary' => __( 'Primary Navigation', 'vcail' ),
    ] );
} );

// ── Enqueue assets ───────────────────────────────────────────────────────────

add_action( 'wp_enqueue_scripts', function () {
    $ver = wp_get_theme()->get( 'Version' );

    // Google Fonts: Inter
    wp_enqueue_style( 'inter-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', [], null );

    // Main theme stylesheet
    wp_enqueue_style( 'vcail-style', get_stylesheet_uri(), [ 'inter-font' ], $ver );

    // App JS (nav toggle + dark mode + pub filtering)
    wp_enqueue_script( 'vcail-app', get_template_directory_uri() . '/assets/js/app.js', [], $ver, true );
} );

// ── Helper: get all posts of a CPT (no limit) ────────────────────────────────

function vcail_get_posts( string $post_type, array $extra_args = [] ): array {
    $args = array_merge( [
        'post_type'      => $post_type,
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'title',
        'order'          => 'ASC',
    ], $extra_args );

    $query = new WP_Query( $args );
    return $query->posts;
}

// ── Helper: get meta, decode JSON arrays ─────────────────────────────────────

function vcail_meta( int $post_id, string $key, $default = '' ) {
    $val = get_post_meta( $post_id, $key, true );
    if ( $val === '' || $val === false ) return $default;
    return $val;
}

function vcail_meta_array( int $post_id, string $key ): array {
    $val = vcail_meta( $post_id, $key, '[]' );
    $decoded = json_decode( $val, true );
    return is_array( $decoded ) ? $decoded : [];
}

// ── Helper: avatar initials ───────────────────────────────────────────────────

function vcail_initials( string $name ): string {
    return implode( '', array_map( fn( $w ) => strtoupper( $w[0] ?? '' ), explode( ' ', trim( $name ) ) ) );
}

// ── Helper: active nav class ─────────────────────────────────────────────────

function vcail_nav_class( string $path ): string {
    $current = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );
    if ( $path === '/' ) {
        return $current === '/' ? 'active' : '';
    }
    return str_starts_with( $current, $path ) ? 'active' : '';
}

// ── Helper: format authors list ──────────────────────────────────────────────

function vcail_format_authors( array $authors, int $max = 0 ): string {
    if ( $max > 0 && count( $authors ) > $max ) {
        return esc_html( implode( ', ', array_slice( $authors, 0, $max ) ) ) . ' et al.';
    }
    return esc_html( implode( ', ', $authors ) );
}

// ── Disable WordPress admin bar on front-end for non-admins ─────────────────

add_action( 'after_setup_theme', function () {
    if ( ! current_user_can( 'manage_options' ) ) {
        show_admin_bar( false );
    }
} );
