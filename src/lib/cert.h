/*
 SPDX-License-Identifier: GPL-2.0-or-later
 myMPD (c) 2018-2021 Juergen Mang <mail@jcgames.de>
 https://github.com/jcorporation/mympd
*/

#ifndef MYMPD_CERT_H
#define MYMPD_CERT_H

#include <stdbool.h>

#include "../dist/src/sds/sds.h"

bool create_certificates(sds dir, sds custom_san);
bool cleanup_certificates(sds dir, const char *name);
#endif
