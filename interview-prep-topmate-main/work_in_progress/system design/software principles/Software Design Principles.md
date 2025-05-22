11 Software Design Principles explained in simple words:

1) 𝐎𝐩𝐞𝐧-𝐂𝐥𝐨𝐬𝐞𝐝 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥𝐞 (𝐎𝐂𝐏): Software entities (classes, modules, functions) should be open for extension but closed for modification.

2) 𝐒𝐢𝐧𝐠𝐥𝐞 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐢𝐛𝐢𝐥𝐢𝐭𝐲 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥𝐞 (𝐒𝐑𝐏): A class should have only one reason to change. It should have only one responsibility.

3) 𝐋𝐢𝐬𝐤𝐨𝐯 𝐒𝐮𝐛𝐬𝐭𝐢𝐭𝐮𝐭𝐢𝐨𝐧 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥𝐞 (𝐋𝐒𝐏): Subtypes must be substitutable for their base types without altering the correctness of the program.

4) 𝐃𝐞𝐩𝐞𝐧𝐝𝐞𝐧𝐜𝐲 𝐈𝐧𝐯𝐞𝐫𝐬𝐢𝐨𝐧 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥𝐞 (𝐃𝐈𝐏): High-level modules should not depend on low-level modules. Both should depend on abstractions.

5) 𝐂𝐨𝐦𝐩𝐨𝐬𝐢𝐭𝐢𝐨𝐧 𝐎𝐯𝐞𝐫 𝐈𝐧𝐡𝐞𝐫𝐢𝐭𝐚𝐧𝐜𝐞: Favor composition (using objects of other classes) over inheritance (extending a base class). It promotes flexibility and reduces tight coupling.

6) 𝐋𝐚𝐰 𝐨𝐟 𝐃𝐞𝐦𝐞𝐭𝐞𝐫 (𝐋𝐨𝐃): A module should not know about the internal workings of the objects it interacts with. It promotes loose coupling.

7) 𝐃𝐨𝐧'𝐭 𝐑𝐞𝐩𝐞𝐚𝐭 𝐘𝐨𝐮𝐫𝐬𝐞𝐥𝐟 (𝐃𝐑𝐘): Avoid duplicating code. Reuse code through abstraction, inheritance, or composition.

8) 𝐒𝐞𝐩𝐚𝐫𝐚𝐭𝐢𝐨𝐧 𝐨𝐟 𝐂𝐨𝐧𝐜𝐞𝐫𝐧𝐬 (𝐒𝐨𝐂): Divide the software into distinct sections, each addressing a separate concern or aspect of functionality.

9) 𝐊𝐞𝐞𝐩 𝐈𝐭 𝐒𝐢𝐦𝐩𝐥𝐞, 𝐒𝐭𝐮𝐩𝐢𝐝 (𝐊𝐈𝐒𝐒): Simplicity should be a key goal in design. Keep things as simple as possible but not simpler.

10) 𝐈𝐧𝐭𝐞𝐫𝐟𝐚𝐜𝐞 𝐒𝐞𝐠𝐫𝐞𝐠𝐚𝐭𝐢𝐨𝐧 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐥𝐞 (𝐈𝐒𝐏): Clients should not be forced to depend on interfaces they do not use.

11) 𝐘𝐀𝐆𝐍𝐈 (𝐘𝐨𝐮 𝐀𝐫𝐞𝐧'𝐭 𝐆𝐨𝐧𝐧𝐚 𝐍𝐞𝐞𝐝 𝐈𝐭): Avoid over-engineering things. Focus on what's essential.