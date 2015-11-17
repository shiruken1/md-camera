!function(t){"use strict";function e(t,e){function o(o,i,n){o.libraryLoaded=!1,o.cameraLive=!1,o.activeCountdown=!1,void 0===o.viewerHeight&&(o.viewerHeight="auto"),void 0===o.viewerWidth&&(o.viewerWidth="auto"),void 0===o.outputHeight&&(o.outputHeight=o.viewerHeight),void 0===o.outputWidth&&(o.outputWidth=o.viewerWidth),(void 0===o.cropHeight||void 0===o.cropWidth)&&(o.cropHeight=!1,o.cropWith=!1),Webcam.set({width:o.viewerWidth,height:o.viewerHeight,dest_width:o.outputWidth,dest_height:o.outputHeight,crop_width:o.cropWidth,crop_height:o.cropHeight,image_format:o.imageFormat,jpeg_quality:o.jpegQuality,force_flash:!1}),"undefined"!==o.flashFallbackUrl&&Webcam.setSWFLocation(o.flashFallbackUrl),Webcam.attach("#md-camera-feed"),Webcam.on("load",function(){console.info("library loaded"),o.$apply(function(){o.libraryLoaded=!0})}),Webcam.on("live",function(){console.info("camera live"),o.$apply(function(){o.cameraLive=!0})}),Webcam.on("error",function(t){console.error("WebcameJS directive ERROR: ",t)}),void 0!==o.shutterUrl&&(o.shutter=new Audio,o.shutter.autoplay=!1,navigator.userAgent.match(/Firefox/)?o.shutter.src=o.shutterUrl.split(".")[0]+".ogg":o.shutter.src=o.shutterUrl),void 0!==o.countdown&&(o.countdownTime=1e3*parseInt(o.countdown),o.countdownText=parseInt(o.countdown)),o.countdownStart=function(){o.activeCountdown=!0,o.countdownPromise=t.defer(),o.countdownTick=setInterval(function(){return o.$apply(function(){var t;t=parseInt(o.countdownText)-1,0===t?(o.countdownText=null!=o.captureMessage?o.captureMessage:"GO!",clearInterval(o.countdownTick),o.countdownPromise.resolve()):o.countdownText=t})},1e3)},o.getSnapshot=function(){void 0!==o.countdown?(o.countdownStart(),o.countdownPromise.promise.then(function(){e(function(){o.activeCountdown=!1,o.countdownText=parseInt(o.countdown)},2e3),void 0!==o.shutterUrl&&o.shutter.play(),Webcam.snap(function(t){o.snapshot=t})})):(void 0!==o.shutterUrl&&o.shutter.play(),Webcam.snap(function(t){o.snapshot=t}))},o.$on("$destroy",function(){Webcam.reset()})}return{restrict:"E",scope:{actionMessage:"@",captureMessage:"@",countdown:"@",flashFallbackUrl:"@",overlayUrl:"@",outputHeight:"@",outputWidth:"@",shutterUrl:"@",viewerHeight:"@",viewerWidth:"@",cropHeight:"@",cropWidth:"@",imageFormat:"@",jpegQuality:"@",snapshot:"="},template:['<div class="md-camera">','<div class="md-camera-countdown" ng-if="countdown" ng-show="activeCountdown">',"<p>{{countdownText}}</p>","</div>",'<div class="md-camera-stack">','<img class="md-camera-overlay" ng-if="overlayUrl" ng-show="cameraLive" ng-src="{{overlayUrl}}" alt="overlay">','<md-whiteframe class="md-whiteframe-2dp" id="md-camera-feed"></md-whiteframe>',"</div>",'<md-button class="md-raised md-primary" id="md-camera-action" ng-click="getSnapshot()">{{actionMessage}}</md-button>',"</div>"].join(""),link:o}}t.module("camera").directive("mdCamera",e),e.$inject=["$q","$timeout"]}(angular);