<?php get_header(); the_post(); ?>

<?php
$id       = get_the_ID();
$authors  = vcail_meta_array( $id, 'authors' );
$year     = vcail_meta( $id, 'year' );
$venue    = vcail_meta( $id, 'venue' );
$abstract = vcail_meta( $id, 'abstract' );
$tldr     = vcail_meta( $id, 'tldr' );
$kc       = vcail_meta( $id, 'key_contributions' );
$doi      = vcail_meta( $id, 'doi' );
$pdf_path = vcail_meta( $id, 'pdf_path' );
$pdf_url  = vcail_meta( $id, 'pdf_url' );
$bibtex   = vcail_meta( $id, 'bibtex' );
$tags     = vcail_meta_array( $id, 'tags' );
$award    = vcail_meta( $id, 'award' );
$s2_id    = vcail_meta( $id, 'semantic_scholar_id' );

$pdf_href = $pdf_path ?: $pdf_url;

// Parse key contributions into bullet lines
$kc_lines = [];
if ( $kc ) {
    foreach ( preg_split( '/\n/', $kc ) as $line ) {
        $line = trim( $line );
        if ( preg_match( '/^[•\-\*]\s*(.+)/', $line, $m ) ) {
            $kc_lines[] = $m[1];
        }
    }
}
?>

<div class="pub-detail">

  <a href="<?php echo esc_url( home_url( '/publications' ) ); ?>"
     style="font-size:0.85rem;color:var(--text-muted);display:inline-flex;align-items:center;gap:0.3rem;margin-bottom:1.5rem;">
    &larr; All Publications
  </a>

  <h1><?php the_title(); ?></h1>

  <div class="pub-detail-meta mt-2">
    <?php foreach ( $tags as $tag ) : ?>
      <span class="badge"><?php echo esc_html( $tag ); ?></span>
    <?php endforeach; ?>
    <?php if ( $year ) : ?>
      <span style="font-size:0.85rem;color:var(--text-muted)"><?php echo esc_html( $year ); ?></span>
    <?php endif; ?>
    <?php if ( $venue ) : ?>
      <span style="font-size:0.85rem;color:var(--text-secondary)"><?php echo esc_html( $venue ); ?></span>
    <?php endif; ?>
  </div>

  <?php if ( $authors ) : ?>
    <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:1rem;">
      <?php echo vcail_format_authors( $authors ); ?>
    </p>
  <?php endif; ?>

  <?php if ( $award ) : ?>
    <div class="award-highlight mb-4">🏆 <?php echo esc_html( $award ); ?></div>
  <?php endif; ?>

  <!-- Action buttons -->
  <div class="pub-action-bar">
    <?php if ( $pdf_href ) : ?>
      <a href="<?php echo esc_url( $pdf_href ); ?>" target="_blank" rel="noopener" class="btn-action-primary">
        📄 PDF
      </a>
    <?php endif; ?>
    <?php if ( $doi ) : ?>
      <a href="https://doi.org/<?php echo esc_attr( $doi ); ?>" target="_blank" rel="noopener" class="btn-action-secondary">
        DOI
      </a>
    <?php endif; ?>
    <?php if ( $s2_id ) : ?>
      <a href="https://www.semanticscholar.org/paper/<?php echo esc_attr( $s2_id ); ?>" target="_blank" rel="noopener" class="btn-action-secondary">
        Semantic Scholar
      </a>
    <?php endif; ?>
  </div>

  <?php if ( $tldr ) : ?>
    <section>
      <h2>TL;DR</h2>
      <p><?php echo esc_html( $tldr ); ?></p>
    </section>
  <?php endif; ?>

  <?php if ( $abstract ) : ?>
    <section>
      <h2>Abstract</h2>
      <p><?php echo esc_html( $abstract ); ?></p>
    </section>
  <?php endif; ?>

  <?php if ( $kc ) : ?>
    <section>
      <h2>Key Contributions</h2>
      <?php if ( $kc_lines ) : ?>
        <ul class="kc-list">
          <?php foreach ( $kc_lines as $line ) : ?>
            <li>
              <span class="kc-bullet"></span>
              <span><?php echo esc_html( $line ); ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      <?php else : ?>
        <p><?php echo esc_html( $kc ); ?></p>
      <?php endif; ?>
    </section>
  <?php endif; ?>

  <?php if ( $bibtex ) : ?>
    <section>
      <h2>BibTeX</h2>
      <pre class="bibtex-block"><?php echo esc_html( $bibtex ); ?></pre>
    </section>
  <?php endif; ?>

</div>

<?php get_footer(); ?>
