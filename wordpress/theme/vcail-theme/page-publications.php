<?php get_header(); ?>

<?php
$all_pubs = vcail_get_posts( 'publication', [
    'orderby'  => 'meta_value_num',
    'meta_key' => 'year',
    'order'    => 'DESC',
] );

// Build year + tag filter options
$years = [];
$tags  = [];
foreach ( $all_pubs as $pub ) {
    $y = vcail_meta( $pub->ID, 'year' );
    if ( $y ) $years[ $y ] = true;
    foreach ( vcail_meta_array( $pub->ID, 'tags' ) as $tag ) {
        $tags[ $tag ] = true;
    }
}
krsort( $years );
ksort( $tags );

// Serialize all pubs as JSON for client-side filtering
$pubs_json = [];
foreach ( $all_pubs as $pub ) {
    $authors  = vcail_meta_array( $pub->ID, 'authors' );
    $pdf_path = vcail_meta( $pub->ID, 'pdf_path' );
    $pdf_url  = vcail_meta( $pub->ID, 'pdf_url' );
    $doi      = vcail_meta( $pub->ID, 'doi' );
    $pubs_json[] = [
        'id'      => $pub->post_name,
        'url'     => get_permalink( $pub->ID ),
        'title'   => $pub->post_title,
        'authors' => $authors,
        'year'    => (int) vcail_meta( $pub->ID, 'year' ),
        'venue'   => vcail_meta( $pub->ID, 'venue' ),
        'tags'    => vcail_meta_array( $pub->ID, 'tags' ),
        'award'   => vcail_meta( $pub->ID, 'award' ),
        'pdfHref' => $pdf_path ?: $pdf_url,
        'doi'     => $doi,
    ];
}
?>

<div class="page-banner">
  <div class="container">
    <h1>Publications</h1>
    <p><?php echo count( $all_pubs ); ?> papers</p>
  </div>
</div>

<div class="container" style="padding-top:2rem;padding-bottom:4rem;">

  <!-- Filters -->
  <div class="pub-filters">
    <input type="search" id="pub-search" placeholder="Search by title or author…" aria-label="Search publications">
    <select id="pub-year" aria-label="Filter by year">
      <option value="">All years</option>
      <?php foreach ( array_keys( $years ) as $y ) : ?>
        <option value="<?php echo esc_attr( $y ); ?>"><?php echo esc_html( $y ); ?></option>
      <?php endforeach; ?>
    </select>
    <select id="pub-tag" aria-label="Filter by type">
      <option value="">All types</option>
      <?php foreach ( array_keys( $tags ) as $tag ) : ?>
        <option value="<?php echo esc_attr( $tag ); ?>"><?php echo esc_html( $tag ); ?></option>
      <?php endforeach; ?>
    </select>
  </div>

  <div class="pub-count" id="pub-count"></div>

  <!-- Publication list (rendered by JS from embedded JSON) -->
  <div id="pub-list" class="space-y-4"></div>
  <noscript>
    <?php foreach ( $all_pubs as $pub ) :
      $authors = vcail_meta_array( $pub->ID, 'authors' );
      $year    = vcail_meta( $pub->ID, 'year' );
      $venue   = vcail_meta( $pub->ID, 'venue' );
      $tags_arr= vcail_meta_array( $pub->ID, 'tags' );
    ?>
      <div class="card pub-list-item">
        <div class="pub-year-col"><?php echo esc_html( $year ); ?></div>
        <div class="pub-info">
          <div class="pub-title">
            <a href="<?php echo esc_url( get_permalink( $pub->ID ) ); ?>"><?php echo esc_html( $pub->post_title ); ?></a>
          </div>
          <div class="pub-meta">
            <?php echo vcail_format_authors( $authors, 5 ); ?> &middot; <?php echo esc_html( $venue ); ?>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </noscript>

</div>

<script>
window.__PUBS__ = <?php echo wp_json_encode( $pubs_json ); ?>;
</script>

<?php get_footer(); ?>
