/*
 SPDX-License-Identifier: GPL-2.0-or-later
 myMPD (c) 2018-2021 Juergen Mang <mail@jcgames.de>
 https://github.com/jcorporation/mympd
*/

#ifndef MYMPD_SDS_EXTRAS_H
#define MYMPD_SDS_EXTRAS_H

#include "../../dist/src/sds/sds.h"

sds sdscatjson(sds s, const char *p, size_t len);
sds sdscatjsonchar(sds s, const char p);
sds sdsurldecode(sds s, const char *p, size_t len, int is_form_url_encoded);
sds sdscrop(sds s);
sds sdsreplacelen(sds s, const char *value, size_t len);
sds sdsreplace(sds s, const char *value);
#endif
