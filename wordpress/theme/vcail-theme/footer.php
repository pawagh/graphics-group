</main><!-- #main -->

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">

      <div>
        <h3><?php echo esc_html( get_bloginfo( 'name' ) ); ?></h3>
        <p>Department of Computer Science</p>
        <p>UNC Chapel Hill</p>
      </div>

      <div>
        <h3>Contact</h3>
        <div class="footer-links">
          <p><span style="color:rgba(255,255,255,0.6)">Prof. Chakravarthula:</span>
             <a href="mailto:cpk@cs.unc.edu">cpk@cs.unc.edu</a></p>
          <p><span style="color:rgba(255,255,255,0.6)">Prof. Fuchs:</span>
             <a href="mailto:fuchs@cs.unc.edu">fuchs@cs.unc.edu</a></p>
        </div>
      </div>

      <div>
        <h3>Links</h3>
        <div class="footer-links">
          <a href="https://cs.unc.edu" target="_blank" rel="noopener noreferrer">UNC CS Department</a>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      &copy; <?php echo date( 'Y' ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?>, UNC Chapel Hill
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
