import { AppModule } from '@app/app.module';
import { InputComponent } from './input.component';

describe('InputComponent.cy.ts', () => {
  it('playground', () => {
    cy.mount(InputComponent, {
      imports: [AppModule],
    });
    cy.fixture('formData.json').then((formData) => {
      cy.get('input').type(formData.youTubeFullLink);
      cy.get('button').click();
    });
  });
});
