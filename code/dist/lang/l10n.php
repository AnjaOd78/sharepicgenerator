<?php
if (!function_exists("gettext")){ die("gettext is not installed"); }

require_once('base.php');
require_once(getBasePath('lib/functions.php'));
useDeLocale();





$domain = "sharepicgenerator";
bindtextdomain($domain, ".");
bind_textdomain_codeset($domain, 'UTF-8');

textdomain($domain);

echo _("Hello world");

// Tutorial https://www.codeandweb.com/babeledit/tutorials/translation-with-gettext-and-php

/*
 * cd de/LCMESSAGES && xgettext --add-comments ../../*.php -d sharepicgenerator

 * msgfmt sharepicgenerator.po --output-file=sharepicgenerator.mo
 *
 */