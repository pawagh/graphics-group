<?php get_header(); ?>

<?php
$all_areas = vcail_get_posts( 'research_area', [ 'orderby' => 'meta_value_num', 'meta_key' => 'order', 'order' => 'ASC' ] );
$current   = array_filter( $all_areas, fn( $a ) => vcail_meta( $a->ID, 'active', '1' ) !== '0' );
$past      = array_filter( $all_areas, fn( $a ) => vcail_meta( $a->ID, 'active', '1' ) === '0' );
?>

<div class="page-banner">
  <div class="container">
    <h1>Research</h1>
    <p><?php echo count( $current ); ?> active projects, <?php echo count( $past ); ?> past projects</p>
  </div>
</div>

<div class="container" style="padding-top:2.5rem;padding-bottom:4rem;">

  <section class="mb-8">
    <h2 style="font-size:1.35rem;margin-bottom:1.5rem;">Current Research</h2>
    <div class="grid-3">
      <?php foreach ( $current as $area ) :
        $img  = vcail_meta( $area->ID, 'image_path' );
        $desc = vcail_meta( $area->ID, 'description' );
        $tags = vcail_meta_array( $area->ID, 'tags' );
      ?>
        <a href="<?php echo esc_url( get_permalink( $area->ID ) ); ?>" class="card card-link research-card">
          <?php if ( $img ) : ?>
            <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $area->post_title ); ?>"
                 class="research-img" loading="lazy">
          <?php endif; ?>
          <div class="research-body">
            <h3><?php echo esc_html( $area->post_title ); ?></h3>
            <p><?php echo esc_html( $desc ); ?></p>
            <?php if ( $tags ) : ?>
              <div class="tags">
                <?php foreach ( $tags as $tag ) : ?>
                  <span class="badge"><?php echo esc_html( $tag ); ?></span>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </section>

  <?php if ( $past ) : ?>
    <section>
      <h2 style="font-size:1.35rem;margin-bottom:1.5rem;">Past Research</h2>
      <div class="grid-3">
        <?php foreach ( $past as $area ) :
          $img  = vcail_meta( $area->ID, 'image_path' );
          $desc = vcail_meta( $area->ID, 'description' );
          $tags = vcail_meta_array( $area->ID, 'tags' );
        ?>
          <a href="<?php echo esc_url( get_permalink( $area->ID ) ); ?>" class="card card-link research-card faded">
            <?php if ( $img ) : ?>
              <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $area->post_title ); ?>"
                   class="research-img" loading="lazy">
            <?php endif; ?>
            <div class="research-body">
              <h3><?php echo esc_html( $area->post_title ); ?></h3>
              <p><?php echo esc_html( $desc ); ?></p>
              <?php if ( $tags ) : ?>
                <div class="tags">
                  <?php foreach ( $tags as $tag ) : ?>
                    <span class="badge"><?php echo esc_html( $tag ); ?></span>
                  <?php endforeach; ?>
                </div>
              <?php endif; ?>
            </div>
          </a>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endif; ?>

</div>

<?php get_footer(); ?>
