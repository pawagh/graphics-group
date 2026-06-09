<?php get_header(); ?>

<?php
// Recent publications (featured first, then most recent by year)
$pubs = vcail_get_posts( 'publication', [ 'orderby' => 'meta_value_num', 'meta_key' => 'year', 'order' => 'DESC' ] );
$featured = array_filter( $pubs, fn( $p ) => vcail_meta( $p->ID, 'featured' ) );
$recent   = count( $featured ) >= 3 ? array_slice( array_values( $featured ), 0, 3 ) : array_slice( $pubs, 0, 3 );

// Recent news
$news_items = vcail_get_posts( 'lab_news', [ 'orderby' => 'meta_value', 'meta_key' => 'date', 'order' => 'DESC' ] );
$recent_news = array_slice( $news_items, 0, 3 );
?>

<!-- Hero -->
<section class="hero">
  <div class="container">
    <h1><?php echo esc_html( get_bloginfo( 'name' ) ); ?></h1>
    <p class="hero-meta">Department of Computer Science &middot; UNC Chapel Hill</p>
    <p class="hero-desc"><?php echo esc_html( get_bloginfo( 'description' ) ); ?></p>
    <div class="hero-actions">
      <a href="<?php echo esc_url( home_url( '/research' ) ); ?>" class="btn-primary">Our Research</a>
      <a href="<?php echo esc_url( home_url( '/publications' ) ); ?>" class="btn-outline">Publications</a>
    </div>
  </div>
</section>

<!-- Recent Publications -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Recent Publications</h2>
      <a href="<?php echo esc_url( home_url( '/publications' ) ); ?>">View all &rarr;</a>
    </div>
    <div class="grid-3">
      <?php foreach ( $recent as $pub ) :
        $authors  = vcail_meta_array( $pub->ID, 'authors' );
        $venue    = vcail_meta( $pub->ID, 'venue' );
        $year     = vcail_meta( $pub->ID, 'year' );
      ?>
        <a href="<?php echo esc_url( get_permalink( $pub->ID ) ); ?>" class="card card-link pub-card">
          <span class="badge"><?php echo esc_html( $venue ); ?></span>
          <div class="pub-title mt-3"><?php echo esc_html( $pub->post_title ); ?></div>
          <div class="pub-authors mt-1"><?php echo vcail_format_authors( $authors, 3 ); ?></div>
          <div class="pub-year mt-2"><?php echo esc_html( $year ); ?></div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Recent News -->
<?php if ( $recent_news ) : ?>
<section class="section-alt">
  <div class="container">
    <div class="section-header">
      <h2>Recent News</h2>
      <a href="<?php echo esc_url( home_url( '/news' ) ); ?>">View all &rarr;</a>
    </div>
    <div class="space-y-4">
      <?php foreach ( $recent_news as $item ) :
        $type    = vcail_meta( $item->ID, 'type', 'other' );
        $summary = vcail_meta( $item->ID, 'summary' );
        $date    = vcail_meta( $item->ID, 'date' );
        $dot_color = match( $type ) {
            'award'  => '#EAB308',
            'paper'  => '#4B9CD3',
            'talk'   => '#A855F7',
            'media'  => '#22C55E',
            'hiring' => '#14B8A6',
            default  => '#9CA3AF',
        };
      ?>
        <div class="card news-item">
          <div class="news-dot-wrap">
            <span class="news-dot" style="background:<?php echo esc_attr( $dot_color ); ?>"></span>
          </div>
          <div>
            <h3><?php echo esc_html( $item->post_title ); ?></h3>
            <p><?php echo esc_html( $summary ); ?></p>
            <time><?php echo esc_html( $date ); ?></time>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<?php get_footer(); ?>
