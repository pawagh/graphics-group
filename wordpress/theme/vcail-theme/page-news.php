<?php get_header(); ?>

<?php
$news_items = vcail_get_posts( 'lab_news', [
    'orderby'  => 'meta_value',
    'meta_key' => 'date',
    'order'    => 'DESC',
] );

$type_meta = [
    'award'  => [ 'label' => 'Award',  'color' => '#EAB308' ],
    'paper'  => [ 'label' => 'Paper',  'color' => '#4B9CD3' ],
    'talk'   => [ 'label' => 'Talk',   'color' => '#A855F7' ],
    'media'  => [ 'label' => 'Media',  'color' => '#22C55E' ],
    'hiring' => [ 'label' => 'Hiring', 'color' => '#14B8A6' ],
    'other'  => [ 'label' => 'News',   'color' => '#9CA3AF' ],
];
?>

<div class="page-banner">
  <div class="container">
    <h1>News</h1>
    <p>Latest updates from our group</p>
  </div>
</div>

<div style="max-width:768px;margin-inline:auto;padding:3rem 1rem 4rem;">
  <div class="space-y-6">
    <?php foreach ( $news_items as $item ) :
      $type    = vcail_meta( $item->ID, 'type', 'other' );
      $summary = vcail_meta( $item->ID, 'summary' );
      $link    = vcail_meta( $item->ID, 'link' );
      $date    = vcail_meta( $item->ID, 'date' );
      $meta    = $type_meta[ $type ] ?? $type_meta['other'];

      // Format date
      $formatted_date = $date;
      if ( $date ) {
          $ts = strtotime( $date );
          if ( $ts ) $formatted_date = date( 'F j, Y', $ts );
      }
    ?>
      <div class="card news-item">
        <div class="news-dot-wrap">
          <span class="news-dot" style="background:<?php echo esc_attr( $meta['color'] ); ?>"></span>
          <span class="news-type-label"><?php echo esc_html( $meta['label'] ); ?></span>
        </div>
        <div>
          <h3>
            <?php if ( $link ) : ?>
              <a href="<?php echo esc_url( $link ); ?>" target="_blank" rel="noopener noreferrer">
                <?php echo esc_html( $item->post_title ); ?>
              </a>
            <?php else : ?>
              <?php echo esc_html( $item->post_title ); ?>
            <?php endif; ?>
          </h3>
          <?php if ( $summary ) : ?>
            <p><?php echo esc_html( $summary ); ?></p>
          <?php endif; ?>
          <time datetime="<?php echo esc_attr( $date ); ?>"><?php echo esc_html( $formatted_date ); ?></time>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</div>

<?php get_footer(); ?>
