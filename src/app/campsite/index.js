import { CampsiteModule } from './core/campsite.module'
import { CampsiteService } from './core/services/campsite.service'
import { CampsiteDataService } from './core/services/campsite-data.service'
import { CampsiteAdminService } from './admin/services/campsite-admin.service'

import { CampsiteTemplate, CampsiteTemplateComponent } from './core/definitions/CampsiteTemplate';

import { NumberPrimitive } from './core/primitives/number-primitive';
import { StringPrimitive } from './core/primitives/string-primitive';
import { TextPrimitive } from './core/primitives/text-primitive';

import { QuoteBlock } from './core/blocks/quote-block/quote-block.component';

module.exports = {
    // Modules
    CampsiteModule,

    // Services
    CampsiteService,
    CampsiteDataService,
    CampsiteAdminService,

    // Definitions
    CampsiteTemplate,
    CampsiteTemplateComponent,

    // Primitives
    NumberPrimitive,
    StringPrimitive,
    TextPrimitive,

    // Blocks
    QuoteBlock,
}