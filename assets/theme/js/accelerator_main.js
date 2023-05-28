 (() => {

 	var __webpack_modules__ = ({

    "./src/_animation.js":

                  ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                  __webpack_require__.r(__webpack_exports__);
                  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                  /* harmony export */   "fadeIn": () => (/* binding */ fadeIn),
                  /* harmony export */   "fadeOut": () => (/* binding */ fadeOut)
                  /* harmony export */ });
                  /**
                   * @returns {Object}
                   */
                  const _defaultFadeConfig = {
                    easing: 'linear',
                    iterations: 1,
                    direction: 'normal',
                    fill: 'forwards',
                    delay: 0,
                    endDelay: 0
                  };
                  /**
                   * @param {HTMLElement} el
                   * @param {number} durationInMs
                   * @param {Object} config
                   * @returns {Promise}
                   */

                  async function fadeOut(el, durationInMs, config = _defaultFadeConfig) {
                    return new Promise(resolve => {
                      const animation = el.animate([{
                        opacity: '1'
                      }, {
                        opacity: '0',
                        offset: 0.5
                      }, {
                        opacity: '0',
                        offset: 1
                      }], {
                        duration: durationInMs,
                        ...config
                      });

                      animation.onfinish = () => resolve();
                    });
                  }
                  /**
                   * @param {HTMLElement} el
                   * @param {number} durationInMs
                   * @param {Object} config
                   * @returns {Promise}
                   */


                  async function fadeIn(el, durationInMs, config = _defaultFadeConfig) {
                    return new Promise(resolve => {
                      const animation = el.animate([{
                        opacity: '0'
                      }, {
                        opacity: '0.5',
                        offset: 0.5
                      }, {
                        opacity: '1',
                        offset: 1
                      }], {
                        duration: durationInMs,
                        ...config
                      });

                      animation.onfinish = () => resolve();
                    });
                  }
                  }),


      "./src/app.sass": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => { __webpack_require__.r(__webpack_exports__); })

 	});
/************************************************************************/
 	// The module cache
 	var __webpack_module_cache__ = {};

 	// The require function
 	function __webpack_require__(moduleId) {
 		// Check if module is in cache
 		var cachedModule = __webpack_module_cache__[moduleId];
 		if (cachedModule !== undefined) {
 			return cachedModule.exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = __webpack_module_cache__[moduleId] = {
 			// no module.id needed
 			// no module.loaded needed
 			exports: {}
 		};

 		// Execute the module function
 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

 		// Return the exports of the module
 		return module.exports;
 	}

/************************************************************************/
 	/* webpack/runtime/define property getters */
 	(() => {
 		// define getter functions for harmony exports
 		__webpack_require__.d = (exports, definition) => {
 			for(var key in definition) {
 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
 				}
 			}
 		};
 	})();

 	/* webpack/runtime/hasOwnProperty shorthand */
 	(() => {
 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
 	})();

 	/* webpack/runtime/make namespace object */
 	(() => {
 		// define __esModule on exports
 		__webpack_require__.r = (exports) => {
 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 			}
 			Object.defineProperty(exports, '__esModule', { value: true });
 		};
 	})();

/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/_animation.js");

const styles = __webpack_require__("./src/app.sass");

/**
 * Get X, Y message position where is showing message
 * @param el message element
 * @return {{x: number, y: number, arrowOffsetX: number}} X,Y message position relative by steps wrapper element and X position of arrow relative by message element
 * @private
 */

const _getPos = el => {
  const targetId = el.getAttribute('data-block-step-target');
  const wrapper = el.closest('.block-steps');
  const targetBlock = wrapper.querySelector(`[data-block-step="${targetId}"]`);
  const title = targetBlock.querySelector('.block-step__title');
  const titleDomRect = title.getBoundingClientRect();
  const wrapperDomRect = wrapper.getBoundingClientRect();
  const relOffsetY = titleDomRect.y - wrapperDomRect.y + titleDomRect.height;
  const relOffsetX = titleDomRect.x - wrapperDomRect.x - titleDomRect.width;
  const x = Math.max(relOffsetX + 30, 0);
  const y = Math.max(relOffsetY + 25, 0); // move arrow to title center

  const arrowOffsetX = titleDomRect.x - wrapperDomRect.x - x + titleDomRect.width / 2 - 36;
  return {
    x,
    y,
    arrowOffsetX
  };
};
/**
 * Update X,Y position of message
 * @param el message element
 */


const updateMessagePosition = el => {
  const {
    x,
    y,
    arrowOffsetX
  } = _getPos(el);

  el.style.top = `${y}px`;
  el.style.left = `${x}px`;
  el.querySelector('.arrow').style.left = `${arrowOffsetX}px`;
};
/**
 * Show block message
 * @param el message element
 */


const showBlock = el => {
  el.classList.add('visible'); // set coords

  updateMessagePosition(el); // show

  (0,_animation__WEBPACK_IMPORTED_MODULE_0__.fadeIn)(el, 250);
};
/**
 * Hide block message
 * @param el message element
 */


const hideBlock = el => {
  return e => {
    if (e) {
      e.preventDefault();
    }

    return (0,_animation__WEBPACK_IMPORTED_MODULE_0__.fadeOut)(el, 250).then(() => {
      el.classList.remove('visible');
    });
  };
}; // On resize window


window.addEventListener('resize', e => {
  // update coords for all active messages
  document.querySelectorAll('.block-step-message.visible').forEach(el => {
    updateMessagePosition(el);
  });
});



document.addEventListener('DOMContentLoaded', e => {
  // Iterate every message element
  document.querySelectorAll('.block-step-message').forEach(el => {
    // show message if active
    if (el.hasAttribute('data-active')) {
      setTimeout(() => {
        showBlock(el);
      }, 250);
    } // handle click close btn


    el.querySelectorAll('[btn-close]').forEach(btn => {
      btn.addEventListener('click', hideBlock(el));
    });
  }); // Handle click tip btn

  document.querySelectorAll('.block-step__tip').forEach(el => {
    const blockId = el.closest('.block-step-wrapper').getAttribute('data-block-step');
    const messageEl = el.closest('.block-steps').querySelector(`[data-block-step-target="${blockId}"]`);
    el.addEventListener('click', e => {
      e.preventDefault();
      let isSameMessageClicked = false; // hide another messages

      document.querySelectorAll('.block-step-message.visible').forEach(el => {
        isSameMessageClicked = isSameMessageClicked ? isSameMessageClicked : messageEl === el;
        hideBlock(el)();
      }); // show clicked message

      if (!isSameMessageClicked) {
        setTimeout(() => {
          showBlock(messageEl);
        }, 100);
      }
    });
  });
});

})();

 })()
;
//# sourceMappingURL=main.js.map
