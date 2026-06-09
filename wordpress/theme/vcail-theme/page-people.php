<?php get_header(); ?>

<?php
$all_people = vcail_get_posts( 'person' );

$role_order = [
    'faculty'  => [ 'label' => 'Faculty',       'roles' => ['faculty'] ],
    'staff'    => [ 'label' => 'Staff',          'roles' => ['staff'] ],
    'students' => [ 'label' => 'Students',       'roles' => ['phd', 'ms', 'undergrad', 'postdoc'] ],
    'collab'   => [ 'label' => 'Collaborators',  'roles' => ['visitor'] ],
    'alumni'   => [ 'label' => 'Alumni',         'roles' => ['alumni'] ],
];

$grouped = [];
foreach ( $all_people as $person ) {
    $role = strtolower( vcail_meta( $person->ID, 'role', 'other' ) );
    foreach ( $role_order as $key => $group ) {
        if ( in_array( $role, $group['roles'], true ) ) {
            $grouped[ $key ][] = $person;
            break;
        }
    }
}
?>

<div class="page-banner">
  <div class="container">
    <h1>People</h1>
    <p><?php echo count( $all_people ); ?> members</p>
  </div>
</div>

<div class="container" style="padding-top:2.5rem;padding-bottom:4rem;">
  <?php foreach ( $role_order as $key => $group ) :
    if ( empty( $grouped[ $key ] ) ) continue;
  ?>
    <section class="people-section">
      <h2><?php echo esc_html( $group['label'] ); ?></h2>
      <div class="grid-3">
        <?php foreach ( $grouped[ $key ] as $person ) :
          $photo  = vcail_meta( $person->ID, 'photo_path' );
          $title  = vcail_meta( $person->ID, 'title' );
          $email  = vcail_meta( $person->ID, 'email' );
          $web    = vcail_meta( $person->ID, 'website' );
          $scholar= vcail_meta( $person->ID, 'google_scholar' );
          $github = vcail_meta( $person->ID, 'github' );
        ?>
          <div class="card person-card">
            <?php if ( $photo ) : ?>
              <img src="<?php echo esc_url( $photo ); ?>"
                   alt="<?php echo esc_attr( $person->post_title ); ?>"
                   class="person-avatar" width="64" height="64" loading="lazy">
            <?php else : ?>
              <div class="person-avatar-placeholder" aria-hidden="true">
                <?php echo esc_html( vcail_initials( $person->post_title ) ); ?>
              </div>
            <?php endif; ?>
            <div>
              <div class="person-name"><?php echo esc_html( $person->post_title ); ?></div>
              <?php if ( $title ) : ?>
                <div class="person-title"><?php echo esc_html( $title ); ?></div>
              <?php endif; ?>
              <div class="person-links">
                <?php if ( $email ) : ?>
                  <a href="mailto:<?php echo esc_attr( $email ); ?>">Email</a>
                <?php endif; ?>
                <?php if ( $web ) : ?>
                  <a href="<?php echo esc_url( $web ); ?>" target="_blank" rel="noopener noreferrer">Website</a>
                <?php endif; ?>
                <?php if ( $scholar ) : ?>
                  <a href="<?php echo esc_url( $scholar ); ?>" target="_blank" rel="noopener noreferrer">Scholar</a>
                <?php endif; ?>
                <?php if ( $github ) : ?>
                  <a href="<?php echo esc_url( $github ); ?>" target="_blank" rel="noopener noreferrer">GitHub</a>
                <?php endif; ?>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </section>
  <?php endforeach; ?>
</div>

<?php get_footer(); ?>
