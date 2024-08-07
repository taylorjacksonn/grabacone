// Defines Vue.js components for reusable header and footer modules for both small and large viewports.

document.addEventListener('DOMContentLoaded', () => {
  // Small viewport header component
    const MyHeader = {
    name: 'MyHeader',
    data() {
        return {
          show: false 
        };
      },
      methods: {
        toggleMenu() {
          this.show = !this.show; // toggles menu visibility
        }
      },
    template:
            `<header>
            <a tabindex='0' href="./index.html"> <img id="logo" src="./imgs/logo-colored.png" alt="Grab A Cone logo"></a>
                <button tabindex='0' aria-haspopup="true" id="menu-btn" @click="toggleMenu" v-if="!show" class="material-symbols-outlined">menu</button>
                <button tabindex='0' id="exit-menu-btn" @click="toggleMenu" class="material-symbols-outlined" v-if="show">cancel</button>
                <Transition name="slide-down">  
                        <nav id="nav-menu" v-if="show" class="{ show }">
                            <ul id="nav-list"> 
                                <li class="list-item"><a href="./index.html" tabindex='0'>Home</a></li>
                                <li class="list-item"><a href="./about-us.html" tabindex='0'>About Us</a></li>
                                <li class="list-item"><a href="./flavors.html" tabindex='0'>Flavors</a></li>
                            </ul>
                        </nav>
            </Transition>
            </header>`
    }
    // Small viewport footer component
    const MyFooter = {
        name: 'MyFooter',
        template: 
            `<footer>
                <p id="hours"><b>open 11-9pm Tuesday-Sunday</b></p>
                <a id="location-a" target="_blank" href="https://goo.gl/maps/79J3kVhYxK37Tf7P8">
                <div class='mini-map'><iframe tabindex='0' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.5704650236166!2d-90.43491838475161!3d42.96625540459576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87fd10ef434d3cb7%3A0x693b932a73ecbc2!2sGrab%20A%20Cone!5e0!3m2!1sen!2sus!4v1678313467975!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                <span id="location-icon" class="material-symbols-outlined">location_on</span>
                <p id="location-p">102 US Highway 18 <br> Montfort, Wisconsin 53569</p>
                <p>(608)-330-3377</p>
                </a>
            </footer>`
    }
    // Large viewport header component
    const LgHeader = {
      name: 'LgHeader',
      template: 
        `<header>
        <a tabindex='0' href="./index.html"> <img id="logo" src="./imgs/logo-colored.png" alt="Grab A Cone logo"></a>
                    <nav id="large-nav-menu">
                        <ul id="large-nav-list"> 
                          <li class="list-item"><a class='list-item-a' href="./index.html" tabindex='0'>Home</a></li>
                          <li class="list-item"><a class='list-item-a' href="./about-us.html" tabindex='0'>About Us</a></li>
                          <li class="list-item"><a class='list-item-a' href="./flavors.html" tabindex='0'>Flavors</a></li>
                        </ul>
                    </nav>
                    <div id='social-icon-container'>
                      <button aria-label="facebook icon opening new tab to Grab A Cone facebook page" id='nav-fb-button'><a target="_blank" id="facebook-icon" href="https://www.facebook.com/profile.php?id=100057554945422" alt='link to facebook page'><i class="fa-brands fa-facebook"></i></a></button>
                      <button aria-label="instagram icon currently opening new tab to Grab A Cone facebook page" id='nav-insta-button'><a target="_blank" id="insta-icon" href="https://www.facebook.com/profile.php?id=100057554945422" alt='link to facebook page'><i class="fa-brands fa-instagram"></i></a></button>
                      <button aria-label="twitter icon currently opening new tab Grab A Cone facebook page" id='nav-tw-button'><a target="_blank" id="tw-icon" href="https://www.facebook.com/profile.php?id=100057554945422" alt='link to facebook page'><i class="fa-brands fa-twitter"></i></a></button>
                    </div>
        </header>`
  }
  // Large viewport footer component
  const LgFooter = {
    name: 'LgFooter',
    template: 
      `<footer>
      <div id='lg-footer-container'>
        <div class='footer-text'>
          <h3 class='cursive-font'>HOURS</h3>
          <p> closed mondays<br>
              tuesday-sunday 11-9pm
          </p>
        </div>
        <a tabindex='0' href="./index.html"> <img class='footer-logo' id="logo" src="./imgs/logo-colored.png" alt="Grab A Cone logo"></a>
        <div class='footer-text'>
          <h3 class='cursive-font'>FIND US</h3>
            <a id="location-a" target="_blank" href="https://goo.gl/maps/79J3kVhYxK37Tf7P8"><p>102 US Highway 18 <br> Montfort, Wisconsin 53569</p></a>
            <p>(608)-330-3377</p>
          </div>    
      </div>
      </footer>`
}
    // creates vue app and registers each header/footer component
    const app = Vue.createApp({
        components: {
            'my-header': MyHeader,
            'my-footer': MyFooter,
            'lg-header': LgHeader,
            'lg-footer': LgFooter
        }
    
    }).mount('#app'); // mounts to #app element
});