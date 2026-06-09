<!DOCTYPE html>
<html <?php language_attributes(); ?> <?php echo get_theme_mod( 'dark_mode', false ) ? 'data-theme="dark"' : ''; ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<nav class="site-nav" aria-label="Main navigation">
  <div class="container nav-inner">

    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav-logo">
      <?php echo esc_html( get_bloginfo( 'name' ) ); ?>
    </a>

    <ul class="nav-links" role="list">
      <?php
      $nav_items = [
        'About'        => '/',
        'People'       => '/people',
        'Publications' => '/publications',
        'Research'     => '/research',
        'Teaching'     => '/teaching',
        'News'         => '/news',
        'Join Us'      => '/join',
      ];
      foreach ( $nav_items as $label => $path ) :
        $cls = vcail_nav_class( $path );
      ?>
        <li>
          <a href="<?php echo esc_url( home_url( $path ) ); ?>" class="<?php echo $cls; ?>">
            <?php echo esc_html( $label ); ?>
          </a>
        </li>
      <?php endforeach; ?>
      <li>
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
          <span id="theme-icon">☀️</span>
        </button>
      </li>
    </ul>

    <div style="display:flex;align-items:center;gap:0.5rem;">
      <button class="theme-toggle" id="theme-toggle-mobile" aria-label="Toggle dark mode">
        <span>☀️</span>
      </button>
      <button class="nav-mobile-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path id="nav-icon-open"  stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/>
          <path id="nav-icon-close" stroke-linecap="round" d="M6 18L18 6M6 6l12 12" style="display:none"/>
        </svg>
      </button>
    </div>

  </div>

  <ul class="nav-mobile-menu container" id="nav-mobile-menu" role="list">
    <?php foreach ( $nav_items as $label => $path ) :
      $cls = vcail_nav_class( $path );
    ?>
      <li>
        <a href="<?php echo esc_url( home_url( $path ) ); ?>" class="<?php echo $cls; ?>">
          <?php echo esc_html( $label ); ?>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>
</nav>

<main id="main" class="site-main">
