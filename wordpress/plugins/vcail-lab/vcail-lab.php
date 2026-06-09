<?php
/**
 * Plugin Name: VCAIL Lab
 * Description: Custom post types and REST API fields for the Graphics & VR Group website.
 *              Drop this file into wp-content/mu-plugins/ — no activation needed.
 * Version:     1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ── Register custom post types ──────────────────────────────────────────────

add_action( 'init', function () {

    register_post_type( 'publication', [
        'label'        => 'Publications',
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'publications',
        'has_archive'  => false,
        'rewrite'      => [ 'slug' => 'publications' ],
        'supports'     => [ 'title', 'custom-fields' ],
        'labels'       => [
            'name'          => 'Publications',
            'singular_name' => 'Publication',
            'add_new_item'  => 'Add New Publication',
            'edit_item'     => 'Edit Publication',
        ],
    ] );

    register_post_type( 'person', [
        'label'        => 'People',
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'people',
        'has_archive'  => false,
        'rewrite'      => [ 'slug' => 'person' ],
        'supports'     => [ 'title', 'custom-fields' ],
        'labels'       => [
            'name'          => 'People',
            'singular_name' => 'Person',
            'add_new_item'  => 'Add New Person',
            'edit_item'     => 'Edit Person',
        ],
    ] );

    register_post_type( 'research_area', [
        'label'        => 'Research Areas',
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'research',
        'has_archive'  => false,
        'rewrite'      => [ 'slug' => 'research' ],
        'supports'     => [ 'title', 'custom-fields' ],
        'labels'       => [
            'name'          => 'Research Areas',
            'singular_name' => 'Research Area',
        ],
    ] );

    register_post_type( 'lab_news', [
        'label'        => 'News',
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'lab-news',
        'has_archive'  => false,
        'rewrite'      => [ 'slug' => 'news-item' ],
        'supports'     => [ 'title', 'custom-fields' ],
        'labels'       => [
            'name'          => 'News',
            'singular_name' => 'News Item',
            'add_new_item'  => 'Add News Item',
        ],
    ] );
} );

// ── Register meta fields (all exposed to REST API) ──────────────────────────

add_action( 'init', function () {

    // Publication fields
    $pub_string_fields = [
        'abstract', 'tldr', 'authors', 'year', 'venue', 'doi',
        'pdf_path', 'pdf_url', 'key_contributions', 'semantic_scholar_id',
        'bibtex', 'tags', 'image_path', 'award',
    ];
    foreach ( $pub_string_fields as $field ) {
        register_post_meta( 'publication', $field, [
            'single'            => true,
            'type'              => 'string',
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
        ] );
    }
    // Boolean fields for publication
    register_post_meta( 'publication', 'featured', [
        'single'       => true,
        'type'         => 'boolean',
        'show_in_rest' => true,
        'default'      => false,
    ] );

    // Person fields
    $person_string_fields = [
        'role', 'title', 'email', 'photo_path', 'bio',
        'website', 'google_scholar', 'github', 'twitter', 'interests',
    ];
    foreach ( $person_string_fields as $field ) {
        register_post_meta( 'person', $field, [
            'single'            => true,
            'type'              => 'string',
            'show_in_rest'      => true,
            'sanitize_callback' => 'sanitize_text_field',
        ] );
    }

    // Research area fields
    $research_string_fields = [
        'description', 'image_path', 'tags', 'publication_ids',
    ];
    foreach ( $research_string_fields as $field ) {
        register_post_meta( 'research_area', $field, [
            'single'       => true,
            'type'         => 'string',
            'show_in_rest' => true,
        ] );
    }
    register_post_meta( 'research_area', 'active', [
        'single'       => true,
        'type'         => 'boolean',
        'show_in_rest' => true,
        'default'      => true,
    ] );
    register_post_meta( 'research_area', 'order', [
        'single'       => true,
        'type'         => 'integer',
        'show_in_rest' => true,
        'default'      => 0,
    ] );

    // News fields
    $news_string_fields = [ 'date', 'summary', 'link', 'type' ];
    foreach ( $news_string_fields as $field ) {
        register_post_meta( 'lab_news', $field, [
            'single'       => true,
            'type'         => 'string',
            'show_in_rest' => true,
        ] );
    }
} );

// ── Flush rewrite rules on activation ───────────────────────────────────────
// (only needed when placed in plugins/, not mu-plugins/)

register_activation_hook( __FILE__, function () {
    flush_rewrite_rules();
} );
